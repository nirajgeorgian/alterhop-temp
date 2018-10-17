import React, { Component } from 'react'
import Header from '../Header.component'
import './editprofile.css'

export default class Editprofile extends Component {
  
  handleSubmit (e) {
    e.preventDefault();
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="alt-main">
          <div className="container1">
            User details to be shown
              </div>
                  <div className="container2">
                  <h3 className="bp3-heading">Edit your Details</h3>
                    <form>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="fname">First Name :</label>
                        </div>
                        <div className="col-75">
                          <input type="text" id="fname" name="firstname" placeholder="First name.." />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="lname">Last Name :</label>
                        </div>
                        <div className="col-75">
                          <input type="text" id="lname" name="lastname" placeholder="Last name.." />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="email">Email :</label>
                        </div>
                        <div className="col-75">
                          <input type="email" id="email" name="email" placeholder="Email.." />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="lname" className=" bp3-radio">Looking for a job change :</label>
                        </div>
                        <div className="col-75">
                          <br />
                          <input type="radio" name="docs-radio-regular" />
                          <span className="bp3-control-indicator"></span>
                          Yes
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="docs-radio-regular" />
                          <span className="bp3-control-indicator"></span>
                          No
                      </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="pref">Job Preferences :</label>
                        </div>
                        <div className="col-75">
                          <select id="location" name="location">
                            <option value="bhubaneswar">Select</option>
                            <option value="bhubaneswar">Bhubaneswar</option>
                            <option value="hydearabad">Hydearabad</option>
                            <option value="kochin">Kochin</option>
                            <option value="pune">Pune</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="delhi">Delhi</option>
                          </select>
                          
                          <select id="location" name="location">
                            <option value="select"> Select </option>
                            <option value="bhubaneswar">Bhubaneswar</option>
                            <option value="hydearabad">Hydearabad</option>
                            <option value="kochin">Kochin</option>
                            <option value="pune">Pune</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="delhi">Delhi</option>
                          </select>
                          
                          <select id="location" name="location">
                            <option value="select"> Select </option>
                            <option value="bhubaneswar">Bhubaneswar</option>
                            <option value="hydearabad">Hydearabad</option>
                            <option value="kochin">Kochin</option>
                            <option value="pune">Pune</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="delhi">Delhi</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-25">
                          <label htmlFor="resume">Upload Your Resume :</label>
                        </div>
                        <div className="col-75">
                          <input type="file" id="file" name="file"  />
                        </div>
                      </div>
              <div className="row">
                <input type="submit" value="Submit" onSubmit={this.handleSubmit.bind(this)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
