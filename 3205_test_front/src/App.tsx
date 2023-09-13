import { useForm } from "@mantine/form";
import { Box, Button, Group, Loader, TextInput } from "@mantine/core";
import { login } from "./api/api";
import { Credentials, User } from "./models/models";

import { useCallback, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>();

  const normalize = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 8;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{2})(\d)/, "$1-$2-$3");
    e.currentTarget.value = value;
  }, []);

  const handleSubmit = async (values: Credentials) => {
    setUsers([]);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;
    try {
      setIsLoading(true);
      setError("");
      const res = await login(values, signal);
      console.log(res);
      const data = await res.json();
      if (!data.length) {
        setError("No such user");
        console.log(error);
      }

      let result = data.filter((item: User) => {
        return item.number === values.number && item.email === values.email;
      });
      if (result.length) {
        setUsers(result);
      } else {
        setUsers(data);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request aborted.");
        // setError(error.name);
      }
      if (error.status)
        if (error.message === "Validation failed") {
          console.log("Validation failed");
          setError(error.message);
        }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      number: "",
    },
    validate: {
      email: (value) =>
        /^[ ]*([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})[ ]*$/.test(
          value
        )
          ? null
          : "Invalid email",
    },
  });
  return (
    <Box maw={300} mx='auto' pt={20}>
      <form
        onSubmit={form.onSubmit((values) => {
          form.setValues({
            number: values.number,
          });
          values["number"] = values.number.replace(/\D/g, "");
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
          onKeyUp={normalize}
        />

        <Group position='right' mt='md'>
          <Button type='submit'>Submit</Button>
        </Group>
      </form>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {users?.map((user: User) => (
        <div key={user.number}>
          {/* <p>Email: {user.email}</p> */}
          <p>
            User number:{" "}
            {user.number.replace(/^(\d{2})(\d{2})(\d)/, "$1-$2-$3")}
          </p>
        </div>
      ))}
    </Box>
  );
}

export default App;
