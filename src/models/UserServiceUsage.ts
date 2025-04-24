
export interface ServiceUsage {
  serviceId: string;
  serviceName: string;
  count: number;
  lastUsed: string;
}

export interface UserServiceUsage {
  email: string;
  services: ServiceUsage[];
}

// Mock data store - will be replaced with Supabase later
const mockUsageStore: Record<string, UserServiceUsage> = {};

export const trackServiceUsage = (email: string, serviceId: string, serviceName: string): void => {
  // Create user record if it doesn't exist
  if (!mockUsageStore[email]) {
    mockUsageStore[email] = {
      email,
      services: []
    };
  }

  // Find the service or create it
  const serviceRecord = mockUsageStore[email].services.find(s => s.serviceId === serviceId);
  
  if (serviceRecord) {
    serviceRecord.count += 1;
    serviceRecord.lastUsed = new Date().toISOString();
  } else {
    mockUsageStore[email].services.push({
      serviceId,
      serviceName,
      count: 1,
      lastUsed: new Date().toISOString()
    });
  }

  // Store in localStorage for persistence
  localStorage.setItem('serviceUsage', JSON.stringify(mockUsageStore));
};

export const getUserServiceUsage = (email: string): ServiceUsage[] => {
  // Try to load from localStorage first
  const storedData = localStorage.getItem('serviceUsage');
  if (storedData) {
    const parsed = JSON.parse(storedData);
    mockUsageStore = parsed;
  }
  
  return mockUsageStore[email]?.services || [];
};
