import { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { useState } from "react";
import i18n from "../i18n";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs & { language?: "es" | "en" | "pt" }>;

// 👇 Componente separado para poder usar Hooks
const LanguageSwitcherTabs = () => {
  const [language, setLanguage] = useState<"es" | "en" | "pt">("es");

  const changeLanguage = (lng: "es" | "en" | "pt") => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/* Botones de idioma */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => changeLanguage("es")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Español
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("pt")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Português
        </button>
      </div>

      {/* Tabs con traducción */}
      <Tabs
        language={language}
        defaultActiveIndex={0}
        tabs={[
          {
            tKey: "tab.home",
            children: <p>Conteúdo da aba Home</p>,
          },
          {
            tKey: "tab.profile",
            children: <p>Conteúdo da aba Perfil</p>,
          },
          {
            tKey: "tab.settings",
            children: <p>Conteúdo da aba Configurações</p>,
          },
        ]}
      />
    </div>
  );
};

export const WithLanguageSwitcher: Story = {
  render: () => <LanguageSwitcherTabs />,
};

export const Default: Story = {
  args: {
    defaultActiveIndex: 0,
    tabs: [
      {
        label: "Tab 1",
        children: <p>Contenido de la Pestaña 1</p>,
      },
      {
        label: "Tab 2",
        children: <p>Contenido de la Pestaña 2</p>,
      },
      {
        label: "Tab 3",
        children: <p>Contenido de la Pestaña 3</p>,
      },
    ],
  },
};
