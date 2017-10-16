package pt.example.dao;


import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_OF_PREP_LIN;

public class RP_OF_PREP_LINDao extends GenericDaoJpaImpl<RP_OF_PREP_LIN,Integer> implements GenericDao<RP_OF_PREP_LIN,Integer> {
	public RP_OF_PREP_LINDao() {
		super(RP_OF_PREP_LIN.class);
	}
	public List<RP_OF_PREP_LIN> getbyid(Integer id) {

		Query query = entityManager.createQuery("Select a from RP_OF_PREP_LIN a where a.ID_OP_CAB = :id and a.ESTADO NOT IN ('C')");
		query.setParameter("id", id);
		List<RP_OF_PREP_LIN> utz = query.getResultList();
		return utz;

	}


}
