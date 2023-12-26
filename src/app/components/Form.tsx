"use client";

import { useEffect, useRef } from "react";
import postMessage from "../actions/postMessage";

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <form
      action={async (formData) => {
        await postMessage(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="p-6 fixed bottom-0 left-0 w-full bg-white"
    >
      <div className="flex">
        <input
          type="text"
          ref={inputRef}
          name="message"
          placeholder="Type your message..."
          className="flex-grow py-2 px-4 outline-none"
        />
        <button
          type="submit"
          className="bg-orange-500 disabled:bg-gray-300 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
