import EmberObject from "@ember/object";
import Mixin from "@ember/object/mixin";
import { isEmpty } from "@ember/utils";
import { setting } from "discourse/lib/computed";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import discourseComputed from "discourse-common/utils/decorators";
import I18n from "discourse-i18n";


export default Mixin.create({
  checkedUsername: null,
  usernameValidationResult: null,
  uniqueUsernameValidation: null,
  maxUsernameLength: setting("max_username_length"),
  minUsernameLength: setting("min_username_length"),

  async fetchExistingUsername() {
    const result = await User.checkUsername(null, this.accountEmail);
    console.log(result);
    if (
      result.suggestion &&
      (isEmpty(this.accountUsername) ||
        this.accountUsername === this.get("authOptions.username"))
    ) {
      this.setProperties({
        accountUsername: result.suggestion,
        prefilledUsername: result.suggestion,
      });
    }
  },

  @discourseComputed(
    "usernameValidationResult",
    "accountUsername",
    "forceValidationReason"
  )
  usernameValidation() {
    if (
      this.usernameValidationResult &&
      this.checkedUsername === this.accountUsername
    ) {
      return this.usernameValidationResult;
    }

    

    if (result.shouldCheck) {
      discourseDebounce(this, this.checkUsernameAvailability, 500);
    }

    return result;
  },


  async checkUsernameAvailability() {
    const result = await User.checkUsername(
      this.accountUsername,
      this.accountEmail
    );

    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    this.set("checkedUsername", this.accountUsername);
    this.set("isDeveloper", !!result.is_developer);
  },
});
