import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function CommonForm({
  action,
  formControls,
  buttonText,
  buttonType,
  isButtonDisabled,
  formData,
  setFormData,
  handleFileChange,
}) {
  return (
    <>
      <form action={action}>
        {formControls.map((item, index) => {
          let content;
          if (item.componentType === "input") {
            content = (
              <Input
                key={index}
                disabled={item.disabled}
                type={item.componentType}
                placeholder={item.placeholder}
                name={item.name}
                id={item.name}
                value={formData[item.name]}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value });
                }}
                className={
                  "w-full rounded-md h-[60px] px-4 border dark:bg-black bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                }
              />
            );
          } else if (item.componentType === "file") {
            content = (
              <Label
                key={index}
                for={item.name}
                className="flex bg-gray-100 dark:bg-black items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
              >
                <h2>{item.label}</h2>
                <Input
                  disabled={item.disabled}
                  onChange={handleFileChange}
                  name={item.name}
                  id={item.name}
                  type={item.componentType}
                />
              </Label>
            );
          }
          return content;
        })}
        <Button
          className={
            "disabled:opacity-60 flex h-11 items-center justify-center px-5"
          }
          type={buttonType || "submit"}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </form>
    </>
  );
}

export default CommonForm;
