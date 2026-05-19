import { useQuery } from "@tanstack/react-query";
import { MOCK_EMPLOYEES } from "../lib/mock-data";

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // Simulate API fetch delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_EMPLOYEES;
    },
  });
};