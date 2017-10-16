package pt.example.dao;


import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_OF_DEF_LIN;
import pt.example.entity.RP_OF_OUTRODEF_LIN;

public class RP_OF_OUTRODEF_LINDao extends GenericDaoJpaImpl<RP_OF_OUTRODEF_LIN,Integer> implements GenericDao<RP_OF_OUTRODEF_LIN,Integer> {
	public RP_OF_OUTRODEF_LINDao() {
		super(RP_OF_OUTRODEF_LIN.class);
	}
	
	
	public List<RP_OF_OUTRODEF_LIN> getbyid(Integer id) {

		Query query = entityManager.createQuery("Select a from RP_OF_OUTRODEF_LIN a where a.ID_OP_LIN = :id");
		query.setParameter("id", id);
		List<RP_OF_OUTRODEF_LIN> utz = query.getResultList();
		return utz;

	}

}
