package pt.example.dao;


import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_CONF_FAMILIA_COMP;
import pt.example.entity.RP_OF_DEF_LIN;

public class RP_CONF_FAMILIA_COMPDao extends GenericDaoJpaImpl<RP_CONF_FAMILIA_COMP,Integer> implements GenericDao<RP_CONF_FAMILIA_COMP,Integer> {
	public RP_CONF_FAMILIA_COMPDao() {
		super(RP_CONF_FAMILIA_COMP.class);
	}


	public List<RP_CONF_FAMILIA_COMP> getbycodfam(String codfam) {

		Query query = entityManager.createQuery("Select a from RP_CONF_FAMILIA_COMP a where a.COD_FAMILIA_COMP = :codfam");
		query.setParameter("codfam", codfam);
		List<RP_CONF_FAMILIA_COMP> utz = query.getResultList();
		return utz;

	}
}
