
import Home from '../Home';
import { render, screen } from "@testing-library/react";


describe('Home Component tests', () =>{

   render(<Home />);
  const text = screen.getByText("My React and TypeScript App");
  expect(text).toBeInTheDocument();

    //Testing Component Render
    let container: HTMLDivElement
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

})