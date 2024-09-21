import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

const FormComp = ({ fields, onSubmit, transcribtion }) => {
  const initialFormState = {};

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const { user } = useUser();

  // Initialize the form state
  fields.forEach((field) => {
    initialFormState[field.name] = field.value || "";

    const userEmail = user.emailAddresses.find((x) => x.emailAddress);
    if (userEmail) formData.email = userEmail;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      transcribtion: transcribtion,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate form inputs
    if (
      formData.email === "" ||
      !formData.email.includes("@") ||
      !formData.email.includes(".") ||
      formData.email.length < 5
    ) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    setFormData({ ...formData, transcribtion: transcribtion });
    onSubmit(formData);
    setFormData(initialFormState);
  };

  return (
    <form
      method="dialog"
      className="form-modal h-full w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      {fields.map((field) => (
        <label key={field.name} className="w-full">
          {field.label}:
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ) : (
            <input
              className="input input-bordered w-full mt-1 mb-4"
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
          <span></span>
          {errors[field.name] && (
            <span className="text-red-500">{errors[field.name]}</span>
          )}
        </label>
      ))}
      <button type="submit" className="btn btn-accent w-full">
        Submit
      </button>
    </form>
  );
};
export default FormComp;
