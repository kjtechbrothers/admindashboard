import { useTenantStore } from "../store/use-tenant-store";

export const useTenant = () => {
  const { currentTenant, setTenant } = useTenantStore();
  
  return {
    tenant: currentTenant,
    changeTenant: setTenant,
    // Use optional chaining (?.) so it returns 'false' if currentTenant is null
    isAlpha: currentTenant?.id === 'alpha',
    isSmart: currentTenant?.id === 'smart',
    isCity: currentTenant?.id === 'city',
  };
};