import { useState, useEffect } from "react";
import { subscriptionService } from "../services/subscriptionService";

const useSubscription = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        const data = await subscriptionService.getSubscription();
        setSubscription(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch subscription.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  return { subscription, isLoading, error };
};

export default useSubscription;