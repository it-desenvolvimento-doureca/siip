package pt.example.dao;

import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_OF_OP_CAB;

public class RP_OF_OP_CABDao extends GenericDaoJpaImpl<RP_OF_OP_CAB, Integer>
		implements GenericDao<RP_OF_OP_CAB, Integer> {
	public RP_OF_OP_CABDao() {
		super(RP_OF_OP_CAB.class);
	}

	public List<RP_OF_OP_CAB> getid(Integer id_of_cab) {

		Query query = entityManager.createQuery("Select a,b,c from RP_OF_OP_CAB a,RP_OF_CAB b,RP_OF_OP_FUNC c  where a.ID_OP_CAB = :id and b.ID_OF_CAB = a.ID_OF_CAB and c.ID_OP_CAB = a.ID_OP_CAB");
		query.setParameter("id", id_of_cab);
		List<RP_OF_OP_CAB> utz = query.getResultList();
		return utz;

	}
	
	public List<Integer> getMaxID() {

		Query query = entityManager.createQuery("Select max(a.ID_OP_CAB) from RP_OF_OP_CAB a");
		List<Integer> utz = query.getResultList();
		return utz;

	}

}
