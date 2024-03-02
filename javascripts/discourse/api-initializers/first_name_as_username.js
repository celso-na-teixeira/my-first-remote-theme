import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("1.8.0", (api) => {
  console.log('testing');
  const siteSettings = api.container.lookup("service:site-settings");

  // Removes the number at the end of string
  api.formatUsername((username) => {
    return username.replace(/\d+$/, "");
  });

  // Prefilling the username based on the first name
  api.modifyClass("component:modal/create-account", {
    
    prefillUsername() {
      // do nothing.
    },
    
    @observes("model.accountEmail", "model.accountUsername")
    prefillAndFormatUsername() {
      console.log('prefillAndFormatUsername');
      if (this.prefilledUsername) {
        console.log(this.prefilledUsernam);
        if (this.model.accountUsername === this.prefilledUsername) {
          this.set("model.accountUsername", "");
        }
        this.set("prefilledUsername", null);
      }

      if (this.get("nameValidation.ok")) {
        const name = this.accountUsername.trim().split(/\s/)[0];
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
