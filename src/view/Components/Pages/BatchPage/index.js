import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
 import axios from 'axios'



const BatchPage = props => {
 
  const downloadUrl = useSelector((state) => state.downloads.download_list)
  
  useEffect(() => {
    downloadUrl.forEach((url) => {
      fetch(url, {
        headers: {
          'Access-Control-Request-Headers': '*',
           
        },
      })
        .then((res) => {
          const header = res.headers 
          console.log(header)
          const parts = header.split(';')
          filename = parts[1].split('=')[1]
          console.log(filename)
        })
        .then((blob) => {
          // Use `filename` here e.g. with file-saver:
          // saveAs(blob, filename);
        })

    
    })
  },[downloadUrl])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
     <table style={{ minWidth: 500 }} aria-label="table">
        <thead>
          <tr>
            <th>Dessert</th>
            <th>Calories</th>
            <th>Fat</th>
          </tr>
        </thead>
        <tbody>
           {/* <tr key={row.name}>
              <td>{row.name}</td>
              <td style={{ width: 160 }} align="right">
                
              </td>
              <td style={{ width: 160 }} align="right">
                
              </td>
          </tr> */}

          { <tr style={{ height: 41 * 5 }}>
              <td colSpan={3} />
            </tr> }
        </tbody>
     </table>
  )
}

export default BatchPage