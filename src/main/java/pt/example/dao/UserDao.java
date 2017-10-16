package pt.example.dao;


import pt.example.entity.User;

public class UserDao extends GenericDaoJpaImpl<User,Integer> implements GenericDao<User,Integer> {
	public UserDao() {
		super(User.class);
	}


}
