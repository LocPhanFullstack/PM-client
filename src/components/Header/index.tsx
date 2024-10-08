type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallText?: boolean;
};

export const Header = ({
  name,
  buttonComponent,
  isSmallText = false,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-between">
      <h1
        className={`${
          isSmallText ? "text-lg" : "text-2xl"
        } font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};
