import React, { useState ,useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter , selectFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const Single = (props) => {
    const [Item, setItem] = useState('');
    const [Value, setValue] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const [fRsb, setfRsb] = useState([]);
    

   useEffect(() => {
    getfRsb();
   
    }, []);

    const Single = async (e) => {
        e.preventDefault(); 
        try {
            await axios.post('http://localhost:5000/Single', {
                Item: Item,
                Value:Value
            });
            // setItem(() => "");
            setValue(() => "");

       //     navigate("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const axiosJWT = axios.create();

    const getfRsb = async () => {
        const response = await axiosJWT.get('http://localhost:5000/F_Single');
        setfRsb(response.data);
    }


const columns = [
 {dataField: 'Id', text: 'Id', sort: true, filter: textFilter()},
 {dataField: 'Item', text: 'Item', sort: true , filter: textFilter()},
 {dataField: 'Value', text: 'Value', sort: true,filter: textFilter() },

 ]

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    // threeDots:true,
    alwaysShowAllBtns: true,
    onPageChange: function(page,sizePerPage){
    console.log('page',page);
    console.log('sizePerPage',sizePerPage);

    },
    onSizePerPageChange: function(page, sizePerPage){
    console.log('page',page);
    console.log('sizePerPage',sizePerPage);
    }

});

    return (
      <div className="center">
       <div className="row">
      <div class="wrapper fadeInDown col-lg-5">
      <div id="formContent">

        <form onSubmit={Single}>
           
            <h1 className='insert-pad'><strong>Single Values</strong></h1><br/>
 <p className="has-text-centered">{msg}</p><br/>
                <input type="text" id="login" class="fadeIn second textInput"  placeholder="Item"value={props.text} onClick={(e) => setItem(props.text)} required/>
                <input type="text" id="login" class="fadeIn second textInput"  placeholder="Value"value={Value} onChange={(e) => setValue(e.target.value)} required />
              
                <input type="submit" class="fadeIn fourth submitInput" onClick={(e) => setItem(props.text)} value="Enter" />
        </form>
      
      </div>
      </div>
    
                     <div className="col-lg-7">
                        <BootstrapTable
                             bootstrap4
                             responsive
                             keyField = 'id'
                             columns = {columns}
                             data= {fRsb}
                             pagination = {pagination}
                             filter = {filterFactory()}

                             />
                     </div>

     </div> </div>
    )
} 

export default Single
