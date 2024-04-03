import React from "react";

type Props = {
	children: React.ReactNode;
};

const ErrorText = ({ children }: Props) => {
	return <p className="text-red-600 text-xs mt-1">{children}</p>;
};

export default ErrorText;
