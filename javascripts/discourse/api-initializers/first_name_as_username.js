import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import discourseDebounce from "discourse-common/lib/debounce";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("1.8.0", (api) => {
  console.log("Hello World!");
});
