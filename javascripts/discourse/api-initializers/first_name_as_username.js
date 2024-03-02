import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("1.8.0", (api) => {
  const siteSettings = api.container.lookup("service:site-settings");

  api.modifyClass("component:modal/create-account", {
    didInsertElement: function(){
        api.formatUsername((username) => {
    return username.split(''_)[0];
  });
    }     
});

  // Prefilling the username based on the first name
/*  api.modifyClass("component:modal/create-account", {
    pluginId: "display-first-name-only",

    prefillUsername() {
      // do nothing.
    },

/*    @observes("model.accountEmail", "model.accountUsername")
    prefillUsernameFromName() {
      if (this.prefilledUsername) {
        if (this.model.accountUsername === this.prefilledUsername) {
          this.set("model.accountUsername", "");
        }
        this.set("prefilledUsername", null);
      }
      if (this.get("nameValidation.ok")) {
        discourseDebounce(
          this,
          async () => {
            const name = this.accountName.trim().split(/\s/)[0];
            if (!name.length) {
              return;
            }
            const result = await User.checkUsername(name, this.accountEmail);

            if (result.suggestion) {
              this.setProperties({
                accountUsername: result.suggestion,
                prefilledUsername: result.suggestion,
              });
            } else {
              this.setProperties({
                accountUsername: name,
                prefilledUsername: name,
              });
            }
          },
          500
        );
      }
    },*/
  });*/
});
