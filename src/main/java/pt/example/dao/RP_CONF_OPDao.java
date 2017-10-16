package pt.example.dao;


import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_CONF_OP;
import pt.example.entity.RP_CONF_OP_NPREV;

public class RP_CONF_OPDao extends GenericDaoJpaImpl<RP_CONF_OP,Integer> implements GenericDao<RP_CONF_OP,Integer> {
	public RP_CONF_OPDao() {
		super(RP_CONF_OP.class);
	}
	public List<RP_CONF_OP> getbyid(String id_utz) {

		Query query = entityManager.createQuery("Select a from RP_CONF_OP a where a.ID_OP_PRINC = :id order by a.ID_OP_SEC");
		query.setParameter("id", id_utz);
		List<RP_CONF_OP> utz = query.getResultList();
		return utz;

	}
	
	
	public List<RP_CONF_OP> getall(){

		Query query = entityManager.createQuery("Select a from RP_CONF_OP a order by a.ID_OP_PRINC");
		List<RP_CONF_OP> utz = query.getResultList();
		return utz;

	}

}
