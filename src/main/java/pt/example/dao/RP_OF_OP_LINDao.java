package pt.example.dao;

import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_OF_OP_CAB;
import pt.example.entity.RP_OF_OP_LIN;

public class RP_OF_OP_LINDao extends GenericDaoJpaImpl<RP_OF_OP_LIN, Integer>
		implements GenericDao<RP_OF_OP_LIN, Integer> {
	public RP_OF_OP_LINDao() {
		super(RP_OF_OP_LIN.class);
	}

	public List<RP_OF_OP_LIN> getbyid(Integer id_utz) {

		Query query = entityManager.createQuery("Select e,g from RP_OF_OP_LIN e, RP_OF_OP_CAB f, RP_OF_CAB g "
				+ "where f.ID_OP_CAB = e.ID_OP_CAB and f.ID_OF_CAB = g.ID_OF_CAB and "
				+ "(e.ID_OP_CAB in( select a.ID_OP_CAB from RP_OF_OP_CAB a where a.ID_OF_CAB in ( "
				+ "Select c.ID_OF_CAB from RP_OF_OP_CAB b, RP_OF_CAB c where b.ID_OP_CAB = :id and b.ID_OF_CAB = c.ID_OF_CAB_ORIGEM ) ) "
				+ "or  e.ID_OP_CAB = :id or "
				+ "e.ID_OP_CAB in (Select r.ID_OP_CAB from RP_OF_OP_CAB r where r.ID_OF_CAB in ( select x.ID_OF_CAB from  RP_OF_OP_CAB x where x.ID_OP_CAB = :id ) and r.ID_OP_CAB != :id) )  order by g.ID_OF_CAB_ORIGEM");
		query.setParameter("id", id_utz);
		List<RP_OF_OP_LIN> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_OP_LIN> getid(Integer id_utz) {

		Query query = entityManager.createQuery("Select a from RP_OF_OP_LIN a where a.ID_OP_LIN = :id");
		query.setParameter("id", id_utz);
		List<RP_OF_OP_LIN> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_OP_LIN> getallbyid(Integer id) {

		Query query = entityManager.createQuery(
				"Select b from RP_OF_OP_CAB a,RP_OF_OP_LIN b, RP_OF_CAB g  where a.ID_OF_CAB = g.ID_OF_CAB and a.ID_OF_CAB in (select c.ID_OF_CAB from  RP_OF_OP_CAB c where c.ID_OP_CAB = :id) and b.ID_OP_CAB = a.ID_OP_CAB order by  g.ID_OF_CAB_ORIGEM");
		query.setParameter("id", id);
		List<RP_OF_OP_LIN> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_OP_LIN> getop(Integer id) {

		Query query = entityManager.createQuery(
				"Select c from RP_OF_OP_CAB a,RP_OF_OP_LIN b,RP_OF_CAB c where b.ID_OP_LIN = :id and b.ID_OP_CAB = a.ID_OP_CAB and a.ID_OF_CAB = c.ID_OF_CAB");
		query.setParameter("id", id);
		List<RP_OF_OP_LIN> utz = query.getResultList();
		return utz;

	}

}
