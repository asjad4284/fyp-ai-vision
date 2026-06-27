import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock pre-seeded users as defined in the FYP cover page
const PRE_SEEDED_USERS = [
  { userID: 'u-1', name: 'Asjad Sajjad', email: 'asjad@uol.edu.pk', password: 'password123' },
  { userID: 'u-2', name: 'Muhammad Motasim', email: 'motasim@uol.edu.pk', password: 'password123' },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Initialize DB tables on mount if they do not exist
  useEffect(() => {
    if (!localStorage.getItem('db_users')) {
      localStorage.setItem('db_users', JSON.stringify(PRE_SEEDED_USERS));
    }
    if (!localStorage.getItem('db_media_uploads')) {
      localStorage.setItem('db_media_uploads', JSON.stringify([]));
    }
    if (!localStorage.getItem('db_ai_predictions')) {
      localStorage.setItem('db_ai_predictions', JSON.stringify([]));
    }
    if (!localStorage.getItem('db_user_feedback')) {
      localStorage.setItem('db_user_feedback', JSON.stringify([]));
    }

    // Check for existing session token
    const token = localStorage.getItem('auth_token');
    if (token) {
      const users = JSON.parse(localStorage.getItem('db_users') || '[]');
      const foundUser = users.find(u => u.email === token); // Simple token representation
      if (foundUser) {
        setCurrentUser({ userID: foundUser.userID, name: foundUser.name, email: foundUser.email });
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
    setAuthLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('db_users') || '[]');
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { success: false, error: 'User does not exist.' };
    }
    
    if (foundUser.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }

    localStorage.setItem('auth_token', foundUser.email);
    setCurrentUser({ userID: foundUser.userID, name: foundUser.name, email: foundUser.email });
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('db_users') || '[]');
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return { success: false, error: 'Email is already registered.' };
    }

    const newUser = {
      userID: 'u-' + Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem('db_users', JSON.stringify(users));
    localStorage.setItem('auth_token', newUser.email);
    setCurrentUser({ userID: newUser.userID, name: newUser.name, email: newUser.email });
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Add scan results to Media_Upload & AI_Prediction relational DB tables
  const addScanHistory = (fileName, fileType, result, confidenceScore) => {
    if (!currentUser) return null;

    const uploads = JSON.parse(localStorage.getItem('db_media_uploads') || '[]');
    const predictions = JSON.parse(localStorage.getItem('db_ai_predictions') || '[]');

    const uploadID = 'up-' + Date.now();
    const newUpload = {
      uploadID,
      userID: currentUser.userID,
      fileName,
      fileType,
      uploadDate: new Date().toISOString(),
    };

    const predictionID = 'pred-' + Date.now();
    const newPrediction = {
      predictionID,
      uploadID,
      result,
      confidenceScore,
    };

    uploads.push(newUpload);
    predictions.push(newPrediction);

    localStorage.setItem('db_media_uploads', JSON.stringify(uploads));
    localStorage.setItem('db_ai_predictions', JSON.stringify(predictions));

    return { uploadID, predictionID, ...newPrediction, ...newUpload };
  };

  // Submit feedback flag (dispute prediction)
  const submitFeedback = (predictionID, issueReported) => {
    if (!currentUser) return { success: false, error: 'Not authenticated.' };

    const feedbacks = JSON.parse(localStorage.getItem('db_user_feedback') || '[]');
    const newFeedback = {
      feedbackID: 'fb-' + Date.now(),
      predictionID,
      userID: currentUser.userID,
      issueReported,
      submissionDate: new Date().toISOString(),
    };

    feedbacks.push(newFeedback);
    localStorage.setItem('db_user_feedback', JSON.stringify(feedbacks));

    return { success: true };
  };

  // Retrieve scanning history joined across uploads & predictions for active user
  const getHistory = () => {
    if (!currentUser) return [];

    const uploads = JSON.parse(localStorage.getItem('db_media_uploads') || '[]');
    const predictions = JSON.parse(localStorage.getItem('db_ai_predictions') || '[]');

    const userUploads = uploads.filter(u => u.userID === currentUser.userID);
    const joined = userUploads.map(upload => {
      const pred = predictions.find(p => p.uploadID === upload.uploadID);
      return {
        ...upload,
        result: pred ? pred.result : 'PENDING',
        confidenceScore: pred ? pred.confidenceScore : 0,
        predictionID: pred ? pred.predictionID : null,
      };
    });

    // Sort by most recent
    return joined.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  };

  const deleteScanHistory = (uploadID) => {
    if (!currentUser) return { success: false, error: 'Not authenticated.' };

    let uploads = JSON.parse(localStorage.getItem('db_media_uploads') || '[]');
    let predictions = JSON.parse(localStorage.getItem('db_ai_predictions') || '[]');

    uploads = uploads.filter(u => u.uploadID !== uploadID);
    const predictionToDelete = predictions.find(p => p.uploadID === uploadID);
    if (predictionToDelete) {
      predictions = predictions.filter(p => p.predictionID !== predictionToDelete.predictionID);
      let feedbacks = JSON.parse(localStorage.getItem('db_user_feedback') || '[]');
      feedbacks = feedbacks.filter(f => f.predictionID !== predictionToDelete.predictionID);
      localStorage.setItem('db_user_feedback', JSON.stringify(feedbacks));
    }

    localStorage.setItem('db_media_uploads', JSON.stringify(uploads));
    localStorage.setItem('db_ai_predictions', JSON.stringify(predictions));

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      authLoading,
      login,
      register,
      logout,
      addScanHistory,
      submitFeedback,
      getHistory,
      deleteScanHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
