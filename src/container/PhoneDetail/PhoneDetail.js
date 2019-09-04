import React, { Component } from 'react'
import { axios } from '../../util'
import {  Button, Paper } from '@material-ui/core'
import { EmailRounded, PersonPinCircle, PhoneAndroidRounded } from '@material-ui/icons'
import AppHeader from '../../component/AppHeader/AppHeader';
import MainTemplate  from '../../template/MainTemplate'
import PhoneContentItens from '../../component/PhoneContentItens'
import Loading from '../../shared/Loading'
import './PhoneDetail.styles.css'

class PhoneDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      phoneDetail : [],
    }
  }

  getPhoneDetail = () => {
    const phoneId = this.props.match.params.phoneId
    axios.get(`phoneList/${phoneId}`).then(({ data }) => {
      this.setState({ isLoading: false, phoneDetail: data })
    })
  }

  componentDidMount() {
    this.getPhoneDetail()
  }

  render() {
    const nameIcon = <PersonPinCircle />
    const emailIcon = <EmailRounded />
    const phoneNumerIcon = <PhoneAndroidRounded />
    const { name, nickName, email, phoneNumer } = this.state.phoneDetail
    
    return(
      <MainTemplate>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <>
            <AppHeader title={name} >
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                onClick={this.handleNewContact}
              >
                Novo Contato
              </Button>
            </AppHeader>
            <Paper className="phone-detail">
              <PhoneContentItens icon={nameIcon} phoneContentText={`${name} (${nickName})`}/>
              <PhoneContentItens icon={emailIcon} phoneContentText={email} />
              <PhoneContentItens icon={phoneNumerIcon} phoneContentText={phoneNumer} />
            </Paper>
          </>
        )}
      </MainTemplate>
    )
  }
}

export default PhoneDetail
