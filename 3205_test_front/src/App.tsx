import { useForm } from "@mantine/form";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { login } from "./api/api";
import { Credentials, User } from "./models/models";

import { useState } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleSubmit = async (values: Credentials) => {
    setUsers([]);
    const res = await login(values);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setUsers(data);
    return data;
  };

  const form = useForm({
    initialValues: {
      email: "",
      number: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      number: (value) => (value.length > 6 ? "Not more than six digits" : null),
    },
  });
  return (
    <Box maw={300} mx='auto' pt={20}>
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <TextInput
          withAsterisk
          label='Email'
          placeholder='your@email.com'
          required
          {...form.getInputProps("email")}
        />

        <TextInput
          label='Number'
          placeholder='number'
          {...form.getInputProps("number")}
        />

        <Group position='right' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>

      {users.map((user: User) => (
        <div key={user.number}>
          <p>Email: {user.email}</p>
          <p>Number:{user.number}</p>
        </div>
      ))}
    </Box>
  );
}

export default App;
