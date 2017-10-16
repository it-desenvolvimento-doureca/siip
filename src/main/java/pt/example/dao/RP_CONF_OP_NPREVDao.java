package pt.example.dao;


import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_CONF_OP_NPREV;
import pt.example.entity.RP_OF_OP_LIN;

public class RP_CONF_OP_NPREVDao extends GenericDaoJpaImpl<RP_CONF_OP_NPREV,Integer> implements GenericDao<RP_CONF_OP_NPREV,Integer> {
	public RP_CONF_OP_NPREVDao() {
		super(RP_CONF_OP_NPREV.class);
	}
	



}
