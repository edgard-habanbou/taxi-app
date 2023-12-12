import Header from '../../components/Header'
import Row from '../../components/Row'
import './index.css'
function UserManagment() {
  const users = [
    {
      fname: 'John',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    },
    {
      fname: 'Jane',
      lname: 'Doe'
    }
  ]
  return (
    <div>
      <Header />
      <div className="flex full-page center">
        <div className="wrapper">
          <div className="content flex column full-width gap">
            {users.map((user, index) => {
              return <Row key={index} user={user}></Row>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagment
