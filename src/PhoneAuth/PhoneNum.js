import React,{Component} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import firebase from './firebase';

class PhoneNum extends Component{
    constructor(){
        super();
        this.state = {
            phone : '',
            eotp : false,
            otp : '', 
            Message  : ''
        }
    }

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({
            [name] : value
        })
    }

    // handleClick = (e) => {
    //     e.preventDefault();
    //     var mobile = '+'+this.state.phone;
    //     var Mess = 'false';
    //     let rechapcha  = new firebase.auth.RecaptchaVerifier('rechapcha');
    //     firebase.auth().signInWithPhoneNumber(mobile,rechapcha).then(function(e){
    //         let code  = prompt("Enter the OTP");
    //         if(code === null) return;
    //         e.confirm(code).then(function(result){
    //             console.log(result.user,'user');
    //             Mess = true;
    //             document.querySelector('label').textContent = result.user.phoneNumber + " Number verified";
    //         }).catch((error)=>{
    //             console.log(error);
    //         })
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    //     if(Mess === true){
    //         this.setState({
    //             Message : "TOmoto"
    //         })
    //     }
    // }

    handleClick = (e) => {
        const {phone} = this.state; 
        e.preventDefault();
        var Mess = 0;
        var mobile = '+'+phone;
        var rechapcha = new firebase.auth.RecaptchaVerifier('rechapcha');
        var login = () => {
            this.setState({
                Message : "hi"
            })
        }
        var errorhandler = () => {
            this.setState({
                Message : "Enter Valid OTP"
            })
        }
        var otp = async() => {
            var o = await firebase.auth().signInWithPhoneNumber(mobile,rechapcha).then(function(e){
                let code = prompt("Enter the OTP");
                if(code === null) return;
                e.confirm(code).then(function(result){
                    login();
                    console.log(result.user,'user');
                }).catch((error)=>{
                    errorhandler();
                    console.log(error)
                })
            }).catch((error)=>{
                console.log(error);
            });
        }
        otp();
    }

    render(){
        const {phone,eotp} = this.state;
        return(
            <div className="PhoneNum"><br/><br/>
                <label></label>
                <form class="form-inline" onSubmit={this.handleClick}>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="inputPassword2" class="sr-only">Phone Number</label>
                        <PhoneInput country={'in'} value={phone} onChange={phone => this.setState({phone})}/>
                    </div>
                    <div id="rechapcha"></div>
                    <button type="submit" class="btn btn-primary mb-2">Send OTP</button><br/>
                    <h1>{this.state.Message}</h1>
                </form>
                {

                }
            </div>
        );
    }
}
export default PhoneNum;
