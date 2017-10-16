package pt.example.dao;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import pt.example.entity.RP_CONF_UTZ_PERF;

public class RPCONFUTZPERFDao extends GenericDaoJpaImpl<RP_CONF_UTZ_PERF,Integer> implements GenericDao<RP_CONF_UTZ_PERF,Integer> {
	public RPCONFUTZPERFDao() {
		super(RP_CONF_UTZ_PERF.class);
	}
	
	@PersistenceContext(unitName = "persistenceUnit")
	protected EntityManager entityManager;

	public List<RP_CONF_UTZ_PERF> getbyid(String id_utz) {

		Query query = entityManager.createQuery("Select a from RP_CONF_UTZ_PERF a where a.ID_UTZ = :id");
		query.setParameter("id", id_utz);
		List<RP_CONF_UTZ_PERF> utz = query.getResultList();
		return utz;

	}

}
