import React from "react";

export const combineComponents = (components: React.ComponentType<any>[]) => {
  const CombinedComponent = components.reduce(
    (
      AccumulatedComponents: React.ComponentType<any>,
      CurrentComponent: React.ComponentType<any>
    ) => {
      const WrappedComponent = ({
        children,
        ...props
      }: React.ComponentProps<any>) => {
        return (
          <AccumulatedComponents {...props}>
            <CurrentComponent {...props}>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      // Set display name for better debugging
      WrappedComponent.displayName = `Wrapped(${
        CurrentComponent.displayName || CurrentComponent.name
      })`;

      return WrappedComponent;
    },
    ({ children }: React.ComponentProps<any>) => <>{children}</>
  );

  // Set display name for the combined component
  CombinedComponent.displayName = "CombinedComponent";

  return CombinedComponent;
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A"; // Handle cases where dateString might be empty or undefined
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
