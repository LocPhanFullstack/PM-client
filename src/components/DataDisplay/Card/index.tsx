"use client";

import classNames from "classnames";
import { Loading } from "../../Loading";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  isLoading?: boolean;
};

export function Card(props: CardProps) {
  const { className, isLoading, children, ...otherProps } = props;

  return (
    <div
      className={classNames(
        "relative overflow-hidden rounded-lg bg-background p-4 shadow",
        className
      )}
      {...otherProps}
    >
      {children}
      {isLoading && (
        <div className="alpha-10 absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden">
          <Loading
            loadingStyle="clip-loader"
            cssOverride={{ marginTop: "20px" }}
            size={60}
          />
        </div>
      )}
    </div>
  );
}
