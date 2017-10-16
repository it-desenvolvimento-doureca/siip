package pt.example.dao;


import pt.example.entity.RP_CONF_EQUIP;

public class RP_CONF_EQUIPDao extends GenericDaoJpaImpl<RP_CONF_EQUIP,Integer> implements GenericDao<RP_CONF_EQUIP,Integer> {
	public RP_CONF_EQUIPDao() {
		super(RP_CONF_EQUIP.class);
	}


}
