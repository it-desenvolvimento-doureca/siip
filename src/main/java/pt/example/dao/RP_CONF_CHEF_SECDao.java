package pt.example.dao;


import pt.example.entity.RP_CONF_CHEF_SEC;

public class RP_CONF_CHEF_SECDao extends GenericDaoJpaImpl<RP_CONF_CHEF_SEC,Integer> implements GenericDao<RP_CONF_CHEF_SEC,Integer> {
	public RP_CONF_CHEF_SECDao() {
		super(RP_CONF_CHEF_SEC.class);
	}


}
