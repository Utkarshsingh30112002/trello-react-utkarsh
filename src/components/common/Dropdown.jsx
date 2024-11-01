import {
    NativeSelectField,
    NativeSelectRoot,
  } from "@/components/ui/native-select"
  
  const Demo = () => {
    return (
      <NativeSelectRoot size="sm" width="240px">
        <NativeSelectField placeholder="Select option">
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
        </NativeSelectField>
      </NativeSelectRoot>
    )
  }