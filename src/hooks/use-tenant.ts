import { useTenantStore } from "../store/use-tenant-store";

export const useTenant = () => {
  const { currentTenant, setTenant } = useTenantStore();
  return {
    tenant: currentTenant,
    changeTenant: setTenant,
    isAlpha: currentTenant.id === 'alpha',
    isSmart: currentTenant.id === 'smart',
    isCity: currentTenant.id === 'city',
  };
};