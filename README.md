# Complexes Components

![npm version](https://img.shields.io/npm/v/complexes-next-components)  
![npm downloads](https://img.shields.io/npm/dm/complexes-next-components)  
![license](https://img.shields.io/npm/l/complexes-next-components)

## Versions

<div align="center">
<p>VERSION: v1.4.2</p>
<p>COMPONENTS</p>
<br />
<ul>
 <li>Avatar</li>
 <li>Badge</li>
 <li>Button</li>
 <li>InputField</li>
 <li>Flag</li>
 <li>Tabs</li>
 <li>Title</li>
 <li>Text</li>
 <li>SelectField</li>
 <li>Multiselect</li>
 <li>TextAreaField</li>
 <li>Modal</li>
 <li>Tooltip</li>
 <li>Table</li>
</ul>
<p>Todos los componentes aceptna traducción</p>
</div>

---

## Before Starting

### Installation

```shell
npm i complexes-next-components


/tailwind.config.ts
import type { Config } from "tailwindcss";

  content: [
    "./node_modules/complexes-next-components/dist/complexes-next-components.js",
  ]
```

# complexesui usalle Avatar

```ts
import { Avatar } from "complexes-next-components";

<Avatar
  src="/GitHub.png"
  alt="Miguel"
  size="sm"
  border="none"
  shape="rounded"
/>;
```

# complexesui usalle InputField

```ts
import { InputField } from "complexes-next-components";

<InputField
  placeholder="nombre"
  inputSize="full"
  rounded="md"
  className="mt-2"
  prefixElement= "<FaUpload className="text-blue-600 w-5 h-5" />",
  type="text"
  {...register("name")}
  hasError={!!errors.name}
  errorMessage={errors.name?.message}
/>;
```

# complexesui usalle MultiSelect

```ts
import { MultiSelect } from "complexes-next-components";

const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

const options = [
  { value: "Bogotá", label: "Bogotá" },
  { value: "Medellin", label: "Medellin" },
  { value: "Cali", label: "Cali" },
];

<MultiSelect
  id="city"
  defaultOption="Ciudad"
  options={options}
  inputSize="full"
  rounded="md"
  hasError={false}
  className="mt-2"
  onChange={setSelectedOptions}
  value={selectedOptions}
/>;
```

# complexesui usalle SelectField

```ts
import { SelectField } from "complexes-next-components";

const [selectedOption, setSelectedOption] = useState("");

const options = [
  { value: "Bogotá", label: "Bogotá" },
  { value: "Medellin", label: "Medellin" },
  { value: "Cali", label: "Cali" },
];

<SelectField
  tKeyHelpText={t("country")}
  tKeyDefaultOption={t("country")}
  searchable
  defaultOption="Pais"
  helpText="Pais"
  sizeHelp="sm"
  id="country"
  options={options}
  inputSize="lg"
  rounded="md"
  {...register("country")}
  hasError={!!errors.country}
  errorMessage={errors.country?.message}
/>;
```

# complexesui usalle Tabs

ts
import { Tabs } from "complexes-next-components";

const tabs = [
{
label: "Frontend",
children: <FrontedSkill />,
colVariant: "default",
size: "md",
background: "default",
padding: "md",
rounded: "lg",
},
]

  <Tabs tabs={tabs} defaultActiveIndex={0} />

````

# complexesui usalle Modal

```ts
import { Modal, Text } from "complexes-next-components";

<Modal isOpen={isOpen} onClose={onClose} title={title}>
  <Text colVariant="primary">description</Text>
</Modal>;
````

# complexesui usalle Button

```ts
import { Button } from "complexes-next-components";
    const { t } = useTranslation();
   <Title size="md" font="semi">Complexes</Title>

    <Button tKey={language} colVariant="warning">
      t("traduccion")
    </Button>

```

# complexesui usalle Buton

```ts
import { Button } from "complexes-next-components";

   <Title size="md" font="semi">Complexes</Title>

    <Buton colVariant="warning">
        button
    </Buton>

```

# complexesui usalle Tittle

```ts
import { Title } from "complexes-next-components";

<Title size="md" font="semi">
  Complexes
</Title>;
```

# complexesui usalle Text

```ts
import { Text } from "complexes-next-components";

<Text size="lg" font="semi">
  Complexes
</Text>;
```

## Contributing

If you have ideas, find any issues, or want to contribute, please visit our GitHub repository:

[GitHub - complexes-next-components](https://github.com/myguel199tp/complexesui)
