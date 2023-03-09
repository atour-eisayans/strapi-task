module.exports = async () => {
  const authenticated = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" });
  const promises = authenticated.permissions
    .filter(
      (permission) =>
        permission.type === "application" &&
        permission.controller === "meeting" &&
        permission.action !== "count"
    )
    .map((permission) =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: permission.id }, { ...permission, enabled: true })
    );

  await Promise.all(promises);
};
