import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";

export default apiInitializer("1.8.0", (api) => {
  const siteSettings = api.container.lookup("service:site-settings");

  if (
    !siteSettings.full_name_required ||
    !siteSettings.prioritize_username_in_ux
  ) {
    return;
  }

  // Removes the number at the end of string
  api.formatUsername((username) => {
    return username.replace(/\d+$/, "");
  });

  // Prefilling the username based on the first name
  api.modifyClass("component:modal/create-account", {
    pluginId: "display-first-name-only",

    prefillUsername() {
      // do nothing.
    },

    prefillAndFormatUsername() {
      if (this.prefilledUsername) {
        if (this.model.accountUsername === this.prefilledUsername) {
          this.set("model.accountUsername", "");
        }
        this.set("prefilledUsername", null);
      }

      if (this.get("nameValidation.ok")) {
        const name = this.accountName.trim().split(/\s/)[0];
        if (!name.length) {
          return;
        }

        // Format the username (replace numbers at the end)
        const formattedUsername = api.formatUsername(name);

        // Validate and set the username
        User.checkUsername(formattedUsername, this.accountEmail).then(
          (result) => {
            this.setProperties({
              accountUsername: result.suggestion || formattedUsername,
              prefilledUsername: result.suggestion || formattedUsername,
            });
          }
        );
      }
    },
  });
});
