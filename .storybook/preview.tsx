import type { Preview } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";

const preview: Preview = {
  globalTypes: {
    language: {
      name: "Language",
      description: "Storybook Language",
      defaultValue: "es",
      toolbar: {
        icon: "globe",
        items: [
          { value: "es", title: "Español" },
          { value: "en", title: "English" },
          { value: "pt", title: "Português" },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const lang = context.globals.language || "es";
      i18n.changeLanguage(lang);

      return (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      );
    },
  ],
};

export default preview;
