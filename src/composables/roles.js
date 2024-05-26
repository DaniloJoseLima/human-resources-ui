
export function userRoles() {
  

  function verifyPermission(permissionsKey, user) {
    const permissions = user.permissions

    if(permissions && Array.isArray(permissions)) {
      const checkPermission = permissions.find(p => p.nameKey == permissionsKey);
      return checkPermission ? true : false
    }

    return false
  }

  return {
    verifyPermission
  }
}