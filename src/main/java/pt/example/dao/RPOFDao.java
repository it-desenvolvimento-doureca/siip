package pt.example.dao;

import java.util.List;

import javax.persistence.Query;

import pt.example.entity.RP_OF_CAB;

public class RPOFDao extends GenericDaoJpaImpl<RP_OF_CAB, Integer> implements GenericDao<RP_OF_CAB, Integer> {
	public RPOFDao() {
		super(RP_OF_CAB.class);
	}

	public List<RP_OF_CAB> getall() {

		Query query = entityManager.createQuery("Select a,b,c from RP_OF_CAB a, RP_OF_OP_CAB b,RP_OF_OP_FUNC c "
				+ "where a.ID_UTZ_CRIA = c.ID_UTZ_CRIA and c.ID_OP_CAB=b.ID_OP_CAB and a.ID_OF_CAB = b.ID_OF_CAB and a.ID_OF_CAB_ORIGEM = null order by c.DATA_INI desc, c.HORA_INI desc ");
		List<RP_OF_CAB> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_CAB> getallbyid(Integer id) {

		Query query = entityManager.createQuery("Select b,c from RP_OF_CAB a, RP_OF_OP_CAB b,RP_OF_OP_FUNC c "
				+ "where b.ID_OF_CAB = :id and c.ID_OP_CAB=b.ID_OP_CAB and a.ID_OF_CAB = b.ID_OF_CAB");
		query.setParameter("id", id);
		List<RP_OF_CAB> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_CAB> getbyid(String id_utz) {

		Query query = entityManager
				.createQuery("Select a from RP_OF_CAB a where a.ID_UTZ_CRIA = :id and a.ESTADO NOT IN ('C','A','M')");
		query.setParameter("id", id_utz);
		List<RP_OF_CAB> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_CAB> getof(Integer id) {

		Query query = entityManager.createQuery("Select a from RP_OF_CAB a where a.ID_OF_CAB = :id");
		query.setParameter("id", id);
		List<RP_OF_CAB> utz = query.getResultList();
		return utz;

	}

	public List<RP_OF_CAB> verifica(String of_num, String op_cod, String op_num) {

		Query query = entityManager.createQuery(
				"Select a from RP_OF_CAB a where a.OF_NUM = :of_num and a.OP_NUM = :op_num and a.OP_COD = :op_cod and a.ESTADO NOT IN ('C','A','M')");
		query.setParameter("of_num", of_num);
		query.setParameter("op_cod", op_cod);
		query.setParameter("op_num", op_num);
		List<RP_OF_CAB> utz = query.getResultList();
		return utz;

	}

}
