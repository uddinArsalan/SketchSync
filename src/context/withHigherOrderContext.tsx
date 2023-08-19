import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

export function withHigherOrderContext(component : FC) {
  const Component = component;
  return function (props : any) {
    return(
    <BrowserRouter>
      <Component {...props}>
        {props.children}
      </Component>
    </BrowserRouter>
    )
  };
}
