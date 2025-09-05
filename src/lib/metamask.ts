// MetaMask utility functions to safely handle wallet connections

interface MetaMaskError {
  code: number;
  message: string;
}

interface MetaMaskProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (params: any) => void) => void;
  removeListener: (event: string, callback: (params: any) => void) => void;
  isMetaMask?: boolean;
}

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
};

// Get MetaMask provider safely
export const getMetaMaskProvider = (): MetaMaskProvider | null => {
  if (typeof window === 'undefined') return null;
  if (!window.ethereum || !window.ethereum.isMetaMask) return null;
  return window.ethereum as MetaMaskProvider;
};

// Safely connect to MetaMask
export const connectMetaMask = async (): Promise<{ success: boolean; address?: string; error?: string }> => {
  try {
    const provider = getMetaMaskProvider();
    
    if (!provider) {
      return {
        success: false,
        error: 'MetaMask is not installed. Please install MetaMask extension.'
      };
    }

    // Request account access
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    });

    if (accounts && accounts.length > 0) {
      return {
        success: true,
        address: accounts[0]
      };
    } else {
      return {
        success: false,
        error: 'No accounts found'
      };
    }
  } catch (error: any) {
    console.error('MetaMask connection error:', error);
    
    // Handle specific MetaMask errors
    if (error.code === 4001) {
      return {
        success: false,
        error: 'User rejected the connection request'
      };
    } else if (error.code === -32002) {
      return {
        success: false,
        error: 'MetaMask connection request already pending'
      };
    } else {
      return {
        success: false,
        error: error.message || 'Failed to connect to MetaMask'
      };
    }
  }
};

// Get current account
export const getCurrentAccount = async (): Promise<string | null> => {
  try {
    const provider = getMetaMaskProvider();
    if (!provider) return null;

    const accounts = await provider.request({
      method: 'eth_accounts'
    });

    return accounts && accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error getting current account:', error);
    return null;
  }
};

// Listen for account changes
export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
  const provider = getMetaMaskProvider();
  if (!provider) return;

  const handleAccountsChanged = (accounts: string[]) => {
    callback(accounts);
  };

  provider.on('accountsChanged', handleAccountsChanged);

  // Return cleanup function
  return () => {
    provider.removeListener('accountsChanged', handleAccountsChanged);
  };
};

// Global error handler for MetaMask
export const setupMetaMaskErrorHandler = () => {
  if (typeof window === 'undefined') return;

  // Prevent MetaMask errors from breaking the app
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message && event.error.message.includes('MetaMask')) {
      console.warn('MetaMask error caught and handled:', event.error.message);
      event.preventDefault();
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('MetaMask')) {
      console.warn('MetaMask promise rejection caught and handled:', event.reason.message);
      event.preventDefault();
    }
  });
};
