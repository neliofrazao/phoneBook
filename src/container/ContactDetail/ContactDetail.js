import React, { Component } from 'react'
import {  Button, Paper } from '@material-ui/core'
import { 
  EmailRounded,
  Edit,
  KeyboardArrowLeftRounded,
  PersonPinCircle,
  PhoneAndroidRounded
} from '@material-ui/icons'
import AppHeader from '../../component/AppHeader/AppHeader';
import MainTemplate  from '../../template/MainTemplate'
import PhoneContentItens from '../../component/PhoneContentItens'
import Loading from '../../component/Loading'
import getPhoneBookList from  '../../api/PhoneBook/PhoneBook'
import './ContactDetail.styles.css'

class ContactDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      contactDetail : [],
    }
  }

  getContactDetail = async () => {
    this.setState({ isLoading: true })
    try {
      const contactId = this.props.match.params.contactId
      const getContactInfo = await getPhoneBookList.getContactInfo(contactId)
      this.setState({ contactDetail: getContactInfo })
    }
    catch(error) {
      console.log(error)
    }
    this.setState({ isLoading: false})
  }

  handleNewContact = () => {
    this.props.history.push('/new-contact')
  }

  handleEditContact = contactId => {
    this.props.history.push(`/edit-contact${contactId}`)
  }

  handleHistoryBack = () => {
    this.props.history.push('/')
  }

  componentDidMount() {
    this.getContactDetail()
  }

  render() {
    const nameIcon = <PersonPinCircle />
    const emailIcon = <EmailRounded />
    const phoneNumberIcon = <PhoneAndroidRounded />
    const { id, name, nickName, email, phoneNumber } = this.state.contactDetail
    
    return(
      <MainTemplate>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <>
            <AppHeader title={name} >
              <Button  variant="contained" color="primary" onClick={this.handleNewContact} >
                Novo Contato
              </Button>
            </AppHeader>
            <Paper className="contact-detail">
              <PhoneContentItens icon={nameIcon} phoneContentText={`${name} (${nickName})`}/>
              <PhoneContentItens icon={emailIcon} phoneContentText={email} />
              <PhoneContentItens icon={phoneNumberIcon} phoneContentText={phoneNumber} />
            </Paper>
            <Paper className="action-bar">
              <Button 
                variant="contained" 
                className="action-bar-buttons" 
                onClick={() => this.handleEditContact(id)}
              >
                <Edit />
                Editar Contato
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.handleHistoryBack}
              >
                <KeyboardArrowLeftRounded />
                Voltar
              </Button>
            </Paper>
          </>
        )}
      </MainTemplate>
    )
  }
}

export default ContactDetail
