import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./AddForm.module.css";

export const AddForm: FC = () => {
  const [ inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        required
        type="text"
        placeholder="Новый элемент списка"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
