import { defineConfig } from "cypress";

export default defineConfig({
	viewportWidth: 1280,
	viewportHeight: 1000,
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		supportFile: false,
	},
});
