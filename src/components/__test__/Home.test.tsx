
import Home from '../Home';
import { cleanup } from "@testing-library/react";
import * as ReactDOM from 'react-dom';



afterEach(cleanup)
describe('Home component render test', ()=> {

    let container: HTMLDivElement
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Home/>,container)
    })

    test('Renders initial Home Component',async () =>{

        const inputs = (await container.querySelectorAll('input'));
        const tables = (await container.querySelectorAll('table'));
        const Header = (await container.querySelectorAll('Header'));
      
        // Start Date Picker, EndDate Picker, Rows Selector on Pagination
        expect(inputs).toHaveLength(3);
        // Bitcoin Price list table
        expect(tables).toHaveLength(1);
        //Header Component
        expect(Header).toHaveLength(1);
    })


})






