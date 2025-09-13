// Validate environment configuration
export const validateConfig = () => {
  const requiredEnvVars = ['NEXT_PUBLIC_API_URL'];
  
  const missingVars = requiredEnvVars.filter(varName => 
    !process.env[varName] && !process.env[`NEXT_PUBLIC_${varName}`]
  );

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }

  console.log('Environment configuration validated successfully');
  return true;
};

// API configuration
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
};

// Validate on import
validateConfig();
