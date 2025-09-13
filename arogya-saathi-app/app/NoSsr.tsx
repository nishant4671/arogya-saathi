// This component prevents common hydration errors caused by browser extensions
// that modify the DOM before React can load. We will wrap our main app content in it.
'use client'; // This marks the component as a Client Component

import { useEffect, useState } from "react"; // Import React hooks

// Define the props this component accepts (mainly, any child components)
interface NoSsrProps {
  children: React.ReactNode;
}

// Define the component itself
const NoSsr: React.FC<NoSsrProps> = ({ children }) => {
  // Create a state variable to track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // This useEffect hook runs only once after the component mounts on the client
  useEffect(() => {
    // Set the state to true, indicating we are now on the client
    setIsMounted(true);
  }, []); // The empty array means this effect runs only once on mount

  // Render the children only after the component has mounted on the client
  // This ensures the server and client renders match, avoiding hydration errors
  return <>{isMounted ? children : null}</>;
};

// Export the component so we can use it in other files
export default NoSsr;